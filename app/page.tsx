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
    RedSpan
} from './components/QuoteGenerator/QuoteGeneratorElements'

// Assets
import CloudFirst from './assets/cloud-and-thunder.png'
import CloudSecond from './assets/cloudy-weather.png'

export default function Home() {
    const [numberOfQuotes, setNumberOfQuotes] = useState<Number | null>(0)


  return (
    <main className={styles.main}>
       <GradientBackgroundCon>
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
