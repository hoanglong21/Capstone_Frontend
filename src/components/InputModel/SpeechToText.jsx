import { useEffect } from 'react'
import SpeechRecognition, {
    useSpeechRecognition,
} from 'react-speech-recognition'
import { MicIconSolid, StopIconSolid } from '../icons'

const SpeechToText = ({
    language,
    handleSpeechToText,
    refresh,
    stateChanger,
}) => {
    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition,
    } = useSpeechRecognition({
        // Set language code to Japanese
        language: language,
        // Display final result only
        interimResults: false,
    })

    useEffect(() => {
        if (refresh) {
            resetTranscript()
            stateChanger(false)
        }
    }, [refresh])

    const startListening = () =>
        SpeechRecognition.startListening({
            continuous: true,
            language: language,
        })

    if (!browserSupportsSpeechRecognition) {
        return <span>Browser doesn't support speech recognition.</span>
    }

    return (
        <div>
            {listening ? (
                <button
                    className="btn btn-outline-danger rounded-circle p-2"
                    onClick={() => {
                        SpeechRecognition.stopListening()
                        handleSpeechToText(transcript)
                    }}
                >
                    <StopIconSolid />
                </button>
            ) : (
                <button
                    className="btn btn-customLight"
                    onClick={startListening}
                >
                    <MicIconSolid />
                </button>
            )}
        </div>
    )
}

export default SpeechToText
