import { useState } from 'react'
import { useEffect } from 'react'

import { handwriting, results } from '../handwriting.canvas.jsx'

import { DrawIconSolid } from '../../icons/index.jsx'
import './Draw.css'

var canvas
const Draw = ({ className, handleHandWriting, disabled }) => {
    const [show, setShow] = useState(false)
    const [results, setResults] = useState([])

    useEffect(() => {
        if (handwriting != null) {
            canvas = new handwriting.Canvas(document.getElementById('myCanvas'))
        } else {
        }
    }, [])

    function erase() {
        canvas.erase()
        setResults([])
    }

    function recognition() {
        handwriting.recognize(canvas.trace, {}, function (result, error) {
            if (error) {
                console.error(error)
            } else {
                setResults(result)
            }
        })
    }

    const handleClick = () => {
        setShow(!show)
    }

    return (
        <div className={`${className} drawContainer`}>
            <button
                className={`btn ${
                    show ? 'btn-outline-primary' : 'btn-customLight'
                } rounded-circle p-2`}
                disabled={disabled}
                onClick={handleClick}
            >
                <DrawIconSolid />
            </button>
            <div className={`card drawInput p-2 ${show ? '' : 'd-none'}`}>
                <canvas id="myCanvas" width="400" height="300"></canvas>
                <div className="d-flex justify-content-end">
                    <button
                        id="eraseBtn"
                        className="btn btn-outline-secondary btn-sm me-2"
                        onClick={erase}
                    >
                        Erase
                    </button>
                    <button
                        id="recognizeBtn"
                        className="btn btn-info btn-sm"
                        onClick={recognition}
                    >
                        Recognize
                    </button>
                </div>
                <div className="d-flex drawResult">
                    {results?.map((word, index) => (
                        <button
                            key={index}
                            className="btn"
                            onClick={() => {
                                handleHandWriting(word)
                                erase()
                            }}
                        >
                            {word}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Draw
