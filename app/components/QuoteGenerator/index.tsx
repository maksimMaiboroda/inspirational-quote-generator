import React, { useState, useEffect } from 'react'
import {
    Backdrop,
    Fade,
    Modal
} from '@mui/material'
import {
    ModalCircularProgress,
    QuoteGeneratorModalCon,
    QuoteGeneratorModalInsertCon,
    QuoteGeneratorSubTitle,
    QuoteGeneratorTitle
} from './QuoteGeneratorElements';
import { ImageBlobCon } from '../animations/AnimationElements';
import AnimatedDownloadButton from '../animations/AnimatedDownloadButton';
import ImageBlob from '../animations/ImageBlob';

interface PropsTypes {
    isOpen: boolean,
    onClose: () => void,
    processingQuote: boolean,
    setProcessingQuote: React.Dispatch<React.SetStateAction<boolean>>,
    quoteReceived: string | null,
    setQuoteReceived: React.Dispatch<React.SetStateAction<string | null>>,
}

const style = {

}

const QuoteGeneratorModal = (props: PropsTypes) => {
    const {
        isOpen,
        onClose,
        processingQuote,
        setProcessingQuote,
        quoteReceived,
        setQuoteReceived
    } = props;

    const [blobUrl, setBlobUrl] = useState<string | null>(null)

    const wiseDevQuote = '"If you can center a div, anything is possible."'
    const wiseDevQuoteAuthor = "- a wise senior software engineer"

    useEffect(() => {
        if (quoteReceived) {
            const binaryData = Buffer.from(quoteReceived, 'base64');
            const blob = new Blob([binaryData], { type: 'image/png' });
            const blobUrlGenerated = URL.createObjectURL(blob);

            console.log({ blobUrlGenerated })

            setBlobUrl(blobUrlGenerated);

            return () => {
                URL.revokeObjectURL(blobUrlGenerated);
            }
        }
    }, [quoteReceived])

    const handleDownload = () => {
        const link = document.createElement('a');

        if (typeof blobUrl === 'string') {
            link.href = blobUrl;
            link.download = 'quote.png';
            link.click();
        }
    }

    return (
        <Modal
            id="QuoteGeneratorModal"
            aria-labelledby="spring-modal-quotegeneratormodal"
            aria-describedby="spring-modal-opens-and-closes-quote-generator"
            open={isOpen}
            onClose={onClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={isOpen}>
                <QuoteGeneratorModalCon sx={style}>
                    <QuoteGeneratorModalInsertCon>
                        {(
                            processingQuote === true && quoteReceived === null &&
                            <>
                                <ModalCircularProgress
                                    size={'8rem'}
                                    thickness={2.5}
                                />
                                <QuoteGeneratorTitle>
                                    Creating your quote...
                                </QuoteGeneratorTitle>
                                <QuoteGeneratorSubTitle style={{ marginTop: '20px' }}>
                                    {wiseDevQuote}
                                    <br></br>
                                    <span style={{ fontSize: 26 }}>{wiseDevQuoteAuthor}</span>
                                </QuoteGeneratorSubTitle>
                            </>
                        )}
                        {quoteReceived === null &&
                            <>
                                <QuoteGeneratorTitle>
                                    Download your quote!
                                </QuoteGeneratorTitle>
                                <QuoteGeneratorSubTitle style={{ marginTop: '20px' }}>
                                    See a preview:
                                </QuoteGeneratorSubTitle>
                                <ImageBlobCon>
                                    <ImageBlob
                                        quoteReceived={quoteReceived}
                                        blobUrl={blobUrl}
                                    />
                                </ImageBlobCon>
                                <AnimatedDownloadButton
                                    handleDownload={handleDownload}
                                />
                            </>
                        }
                    </QuoteGeneratorModalInsertCon>
                </QuoteGeneratorModalCon>

            </Fade>
        </Modal>
    )
}

export default QuoteGeneratorModal