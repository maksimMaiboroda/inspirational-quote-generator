"use client"

import { useState, useEffect } from 'react'
import Image from 'next/image'
import styles from './page.module.css'

// Components
import {
    BackgroundImageFirst,
    BackgroundImageSecond,
    GradientBackgroundCon,
    FooterCon,
    FooterLink,
    RedSpan,
    QuoteGeneratorCon,
    QuoteGeneratorInnerCon,
    QuoteGeneratorTitle,
    QuoteGeneratorSubTitle,
    GenerateQuoteButton,
    GenerateQuoteButtonText
} from './components/QuoteGenerator/QuoteGeneratorElements'

// Assets
import CloudFirst from './assets/cloud-and-thunder.png'
import CloudSecond from './assets/cloudy-weather.png'


// AWS imports
import { API, Amplify } from 'aws-amplify';
import awsExports from '../src/aws-exports';
import { quotesQueryName } from '@/src/graphql/queries'
import { GraphQLResult } from '@aws-amplify/api-graphql'
import QuoteGeneratorModal from './components/QuoteGenerator'

Amplify.configure({ ...awsExports, ssr: true });

// Interface for our DynamoDB object

interface UpdateQuoteInfoData {
    id: string;
    queryName: string;
    quotesGenerated: number;
    createdAt: string;
    updatedAt: string;
}

// type guard for our fetch function
function isGraphQLResultForquotesQueryName(response: any): response is GraphQLResult<{
    quotesQueryName: {
        items: [UpdateQuoteInfoData];
    };
}> {
    return response.data && response.data.quotesQueryName && response.data.quotesQueryName.items;
}

export default function Home() {
    const [numberOfQuotes, setNumberOfQuotes] = useState<Number | null>(0)
    const [isOpenGenerator, setIsOpenGenerator] = useState(false)
    const [processingQuote, setProcessingQuote] = useState(false)
    const [quoteReceived, setQuoteReceived] = useState<string | null>(null)

    // Function to fetch our DynamoDB object (quotes generated)
    const updateQuoteInfo = async () => {
        try {
            const response = await API.graphql<UpdateQuoteInfoData>({
                query: quotesQueryName,
                authMode: 'AWS_IAM',
                variables: {
                    queryName: "LIVE",
                }
            })

            // Create type guards
            if (!isGraphQLResultForquotesQueryName(response)) {
                throw new Error('Unexpected response from API.graphql');
            }

            if (!response.data) {
                throw new Error('Response data is undefined');
            }

            const receivedNumberOfQuotes = response.data.quotesQueryName.items[0].quotesGenerated;
            setNumberOfQuotes(receivedNumberOfQuotes);

        } catch (error) {
            console.log('error getting quote data', error)
        }
    };


    useEffect(() => {
        updateQuoteInfo()
    }, [])

    const handleCloseGenerator = () => {
        setIsOpenGenerator(false);
    }

    const handleOpenGenerator = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        setIsOpenGenerator(true);
        setProcessingQuote(true);

        try {
            // Run Lambda Function
            // setProcessingQuote(false);

            setTimeout(()=>{
                setProcessingQuote(false);
            }, 3000)
        } catch (error) {
            console.log('error generation quote: ', error);
            setProcessingQuote(false);
        }

    }


    return (
        <main className={styles.main}>
            {/* Background */}
            <GradientBackgroundCon>

                {/* Quote Generator Modal Pup-Up */}
                <QuoteGeneratorModal
                    isOpen={isOpenGenerator}
                    onClose={handleCloseGenerator}
                    processingQuote={processingQuote}
                    setProcessingQuote={setProcessingQuote}
                    quoteReceived={quoteReceived}
                    setQuoteReceived={setQuoteReceived}
                />

                {/* Quote Generator */}
                <QuoteGeneratorCon>
                    <QuoteGeneratorInnerCon>
                        <QuoteGeneratorTitle>
                            Daily Inspiration Generator
                        </QuoteGeneratorTitle>

                        <QuoteGeneratorSubTitle>
                            Looking for a splash of inspiration? Generate a quote card with a random inspirational quote provided by{' '}
                            <FooterLink
                                href="https://zenquotes.io/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                ZenQuotes API.
                            </FooterLink>
                        </QuoteGeneratorSubTitle>

                        <GenerateQuoteButton onClick={handleOpenGenerator}>
                            <GenerateQuoteButtonText>
                                Make a Quote
                            </GenerateQuoteButtonText>
                        </GenerateQuoteButton>
                    </QuoteGeneratorInnerCon>
                </QuoteGeneratorCon>


                {/* Background Images */}
                <BackgroundImageFirst
                    src={CloudFirst}
                    height='300'
                    alt='cloudyBackgroundOne'
                />

                <BackgroundImageSecond
                    src={CloudSecond}
                    height='300'
                    alt='cloudyBackgroundOne'
                />

                {/* Footer */}
                <FooterCon>
                    <>
                        Quotes Generated: {numberOfQuotes}
                        <br />
                        Developed with <RedSpan>♥</RedSpan> by{' '}
                        <FooterLink
                            href="https://github.com/maksimMaiboroda"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            @Majjboro
                        </FooterLink>
                    </>
                </FooterCon>
            </GradientBackgroundCon>
        </main>
    )
}
