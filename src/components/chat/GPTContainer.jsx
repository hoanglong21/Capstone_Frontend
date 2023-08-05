import { useState } from "react";
import { Configuration, OpenAIApi } from "openai";

// hide key
const configuration = new Configuration({
  organization: process.env.REACT_APP_ORGANIZATION,
  apiKey: process.env.REACT_APP_API_KEY,
});


// fix: Refused to set unsafe header "User-Agent" (because it auto add in configuration)
delete configuration.baseOptions.headers['User-Agent'];

const openai = new OpenAIApi(configuration);

function GPTContainer() {
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const chat = async (e, message) => {
    e.preventDefault();

    if (!message) return;
    setIsTyping(true);
    window.scrollTo(0,1e10)

    let msgs = chats;
    msgs.push({ role: "user", content: message });
    setChats(msgs);

    setMessage("");

    await openai
      .createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "You are a embedded GPT. You can help with learning Japanese",
          },
          ...chats,
        ],
      })
      .then((res) => {
        msgs.push(res.data.choices[0].message);
        setChats(msgs);
        setIsTyping(false);
        window.scrollTo(0,1e10)
      })
      .catch((error) => {
        console.log(error);
      });
  };
  var styles = {
    width: "95%",
    whiteSpace: "pre-wrap",
    margin: "auto"
  };
  return (
    <main>
      <h1>Chat AI</h1>

      <section>
        {chats && chats.length
          ? chats.map((chat, index) => (
              <div key={index} className={chat.role === "user" ? "user_msg" : ""}>
                <span>
                  <b>{chat.role.toUpperCase()}</b>
                </span>
                <span>:</span>
                <pre style={styles}>{chat.content}</pre>
              </div>
            ))
          : ""}
      </section>

      <div className={isTyping ? "" : "hide"}>
        <p>
          <i>{isTyping ? "Typing" : ""}</i>
        </p>
      </div>

      <form action="" onSubmit={(e) => chat(e, message)}>
        <input
          type="text"
          name="message"
          value={message}
          placeholder="Type a message here and hit Enter..."
          onChange={(e) => setMessage(e.target.value)}
        />
      </form>
    </main>
  );
}

export default GPTContainer;