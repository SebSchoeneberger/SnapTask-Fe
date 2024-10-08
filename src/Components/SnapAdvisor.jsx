import { useState, useContext, useRef, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../Context/AuthProvider";
import AiAvatar from "../assets/128561149_GIU AMA 255-08.svg";
import { getToken } from "../Utils/TokenUtils";

function SnapAdvisor() {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState([]);
  const [includeData, setIncludeData] = useState(true);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hey, this is your Snap Advisor! How can I help you today?",
    },
  ]);

  const apiToken = import.meta.env.VITE_OPENAI_API_KEY;
  const API_URL = import.meta.env.VITE_API_URL;
  const token = getToken();

  useEffect(() => {
    const fetchTasks = () => {
      axios
        .get(`${API_URL}/tasks`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setTasks(res.data.tasks);
        })
        .catch((error) => {
          // toast.error("Error loading tasks");
          console.log(error.message);
        });
    };

    fetchTasks();
  }, []);

  function formatTasksForPrompt(tasks) {
    return tasks
      .map((task) => {
        return `
        Task: ${task.title}
        Area: ${task.area.name}
        Status: ${task.status}
        Priority: ${task.priority}
        Description: ${task.description || "No description provided"}
        Due Date: ${new Date(task.dueDate).toLocaleDateString()}
        Assigned To: ${
          task.assignedTo.length > 0
            ? task.assignedTo
                .map((assignee) => `${assignee.firstName} ${assignee.lastName}`)
                .join(", ")
            : "Not assigned yet"
        }
        Is Overdue: ${task.isOverdue ? "Yes" : "No"}
        `;
      })
      .join("\n\n"); // Separate each task with a double newline
  }

  const headers = {
    "Content-Type": "application/json",
    Provider: "open-ai",
    Mode: "production",
    Authorization: `Bearer ${apiToken}`,
  };

  // Scroll into the view function
  const messagesEndRef = useRef(null);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = (message) => {
    const userMessage = message || input;

    if (!userMessage || userMessage.trim().length === 0) {
      return;
    }
    const newMessages = [...messages, { role: "user", content: userMessage }];
    setMessages(newMessages);

    const body = {
      model: "ft:gpt-3.5-turbo-1106:snaptask:snap-advisor:A3PCryYO",
      messages: [
        {
          role: "system",
          content:
            "You are Snap Advisor, a highly knowledgeable assistant for the Snaptask Task Management App. You provide detailed guidance, answer questions related to task management, generating reports, analyzing performance, and using QR codes effectively within Snaptask. Try to answer users Questions as shortly as possible.",
        },
        {
          role: "user",
          content: userMessage,
        },
      ],
      max_tokens: 500,
    };

    if (includeData && tasks.length > 0) {
      const formattedTasks = formatTasksForPrompt(tasks);
      body.messages.push({
        role: "system",
        content: `Here is the relevant task data:\n\n${formattedTasks}`,
      });
    }

    setLoading(true);

    axios
      .post(`${API_URL}/chat/completion`, body, { headers })
      .then((response) => {
        // console.log(response);
        // Adjusted to properly access the assistant's reply from the response
        const assistantReply = response.data.message.content;
        setMessages([
          ...newMessages,
          { role: "assistant", content: assistantReply },
        ]);
        setInput(""); // Clear input after submission
      })
      .catch((error) => {
        console.error("Error:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  function handleClose(e) {
    e.preventDefault();
    document.getElementById("snapAdvisor").close();
    setMessages([
      {
        role: "assistant",
        content: "Hey, this is your Snap Advisor! How can I help you today?",
      },
    ]);
    setInput("");
  }

  const suggestedQuestions = [
    "Provide a summary report of all the current tasks that are in the system. How many are of each status?",
    "Who is the best worker now? Who has completed the most tasks on time?",
    "Which 3 areas have the most unfinished tasks and how many unfinished tasks are there in total?",
    "What are the top 5 unfinished tasks with the highest priority?",
    "What areas are the most problematic in terms of task completion and why?",
  ];

  const handleSuggestedQuestion = (question) => {
    setInput(question);
    handleSubmit(question);
  };

  return (
    <>
      <dialog id="snapAdvisor" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box bg-base-200 rounded-2xl min-w-[1200px] h-full">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-semibold text-left w-full max-w-xl">
              Snap Advisor
            </h3>
            <button type="button" onClick={handleClose} className="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex gap-4">
              <div className="modal-action border-2 flex flex-col h-[600px] overflow-y-auto w-full">
                <div className="flex flex-col gap-2 flex-grow overflow-y-auto p-4">
                  {messages.map((msg, index) => (
                    <div
                      key={index}
                      className={`chat ${
                        msg.role === "assistant" ? "chat-start" : "chat-end"
                      }`}
                    >
                      <div className="chat-image avatar">
                        <div className="w-10 rounded-full">
                          <img
                            alt="Avatar"
                            src={
                              msg.role === "user" ? user.profileImage : AiAvatar
                            }
                          />
                        </div>
                      </div>
                      <div
                        className={`chat-bubble text-left ${
                          msg.role == "user"
                            ? "bg-neutral text-neutral-content"
                            : "bg-neutral-content text-neutral"
                        }`}
                      >
                        {msg.content}
                      </div>
                    </div>
                  ))}
                  {loading && (
                    <div className="flex justify-start items-center mt-2 pl-2">
                      <span className="loading loading-dots loading-md"></span>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </div>

              <div className="modal-action border-2 flex flex-col justify-start h-[600px] w-[400px]">
                <h3 className="p-4">Suggested Questions:</h3>
                <ul className="menu bg-base-200 rounded-box p-2 overflow-y-auto">
                  {suggestedQuestions.map((question, index) => (
                    <li key={index}>
                      <a
                        onClick={() => {
                          handleSuggestedQuestion(question);
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        {question}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <label className="input input-bordered flex input-primary items-center w-[840px] gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.068.157 2.148.279 3.238.364.466.037.893.281 1.153.671L12 21l2.652-3.978c.26-.39.687-.634 1.153-.67 1.09-.086 2.17-.208 3.238-.365 1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
                  />
                </svg>
                <input
                  type="text"
                  className={`grow ${loading ? "disabled" : ""}`}
                  placeholder="Ask Snap Advisor anything about your Data..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !loading) {
                      e.preventDefault();
                      handleSubmit();
                    }
                  }}
                  disabled={loading}
                />
                <button onClick={() => handleSubmit()} disabled={loading}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-6 w-6 opacity-70"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                    />
                  </svg>
                </button>
              </label>

              <div className="form-control flex">
                <label className="cursor-pointer label gap-2">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-primary"
                    checked={includeData}
                    onChange={() => setIncludeData(!includeData)}
                  />
                  <span className="label-text text-sm">
                    Share your account data with the advisor?
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}

export default SnapAdvisor;
