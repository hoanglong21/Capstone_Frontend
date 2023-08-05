import React from 'react'

function ViewDetailTest() {
  return (
    <div className="containerTest">
      <h3 style={{textAlign: "center"}}>Vocabulary - Grammar Lesson 3 Test</h3>
      <p style={{textAlign: "center"}}>Timing out: 20:00:00</p>
      <p style={{borderBottom: '#E7D8C9 dashed 1px'}}></p>
      <section>
        <form className="testForm">
          <h5>1. What is the correct translation for "telephone"?</h5>
          <input type="radio" className="q1" value="a" id="q1a" />
          a. 本
          <br />
          <input type="radio" className="q1" value="b" id="q1b" />
          b. 電話
          <br />
          <input type="radio" className="q1" value="c" id="q1c" />
          c. ペン
          <br />
          <input type="radio" className="q1" value="d" id="q1d" />
          d. 電気
          <br />
          <h5>2. How do you say "Good morning"?</h5>
          <input type="radio" className="q2" value="a" id="q2a" />
          a. おはよう<br />
          <input type="radio" className="q2" value="b" id="q2b" />
          b. すみません<br />
          <input type="radio" className="q2" value="c" id="q2c" />
          c. こんばんは<br />
          <input type="radio" className="q2" value="d" id="q2d" />
          d. No correct answer
          <br />
          <h5>3. "Good evening" is "こんばんは"?</h5>
          <input type="radio" className="q3" value="a" id="q3a" />
          a. True
          <br />
          <input type="radio" className="q3" value="b" id="q3b" />
          b. False
          <br />
          <h5>4. What is the correct translation for "Please"?</h5>
          <input type="radio" className="q4" value="a" id="q4a" />
          a. おねがいだから<br />
          <input type="radio" className="q4" value="b" id="q4b" />
          b. しつれい<br />
          <input type="radio" className="q5" value="c" id="q5c" />
          c. こんにちは<br />
          <input type="radio" className="q5" value="d" id="q5d" />
          d.  No correct answer
          <br />
          <br />
          <br />
          <div className="text-center" style={{marginTop: "-20px"}}>
          <input type="submit" value="Close" className="submitTest py-2 pt-2"/>
          </div>
        </form>
      </section>
    </div>
  )
}

export default ViewDetailTest