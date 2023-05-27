"use client"

import { useState } from 'react'
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
import { Amplify } from 'aws-amplify';
import awsExports from '../src/aws-exports';

Amplify.configure({ ...awsExports, ssr: true });

export default function Home() {
    const [numberOfQuotes, setNumberOfQuotes] = useState<Number | null>(0)


  return (
    <main className={styles.main}>
        {/* Background */}
        <GradientBackgroundCon>

            {/* Quote Generator Modal Pup-Up */}
            {/* <QuoteGeneratorModal/> */}

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

                    <GenerateQuoteButton>
                        <GenerateQuoteButtonText onClick={()=>{}}>
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
                    <br/>
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
