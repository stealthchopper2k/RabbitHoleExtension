import React, { useState, useRef, useEffect } from "react";
import { Button } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";
import { PostHistory } from "./History";

function Dropdown({ date_options, topic_options, handleDate, handleTopic }) {
  return (
    <div className="flex flex-col w-full gap-4">
      <Select
        label="Select an Time"
        color={"blue"}
        className="max-w-xs"
      >
        {Object.keys(date_options).map((option) => (
          <SelectItem key={option} onClick={() => {
            handleDate(option)
          }
          }>
            {option}
          </SelectItem>
        ))}
      </Select>
      <Select
        label="Topics"
        color={"purple"}
        placeholder="Select the topics"
        className="max-w-xs"
        selectionMode="multiple"
      >
        {topic_options.map((option, i) => (
          <SelectItem key={i} value={option} onClick={() => {
            handleTopic(option)
          }
          }>
            {option}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
}

export function UserPrompt({ user, updateUser }) {
  let day_in_milisecond = 24 * 60 * 60 * 1000;

  const date_options = {
    "Last Week": new Date().getTime() - (7 * day_in_milisecond),
    "Last Month": new Date().getTime() - (30 * day_in_milisecond),
    "Three Months": new Date().getTime() - (90 * day_in_milisecond),
  }

  const topic_options = ["Computing", "Law", "Science", "Maths"];

  const [options, setOptions] = useState({
    date: "Last Week",
    topic: []
  });

  function handleDate(option) {
    setOptions({ ...options, ["date"]: option })
  }

  function handleTopic(selected) {
    const findIndex = options["topic"].indexOf(selected);

    if (findIndex === -1) {
      setOptions((prevState) => ({
        ...prevState,
        topic: [...prevState.topic, selected],
      }));
    } else {
      setOptions((prevState) => ({
        ...prevState,
        topic: prevState.topic.filter((topic) => topic !== selected),
      }));
    }
  }

  async function getHistory() {
    // get all history from startime date_options[options["date"]]
    const res = await chrome.history.search({ text: '', startTime: date_options[options["date"]], maxResults: 5000 });

    return {
      history: res,
      timeTaken: Date.now()
    };
  }

  useEffect(() => {
    console.log(options)
  }, [options])

  return (
    <div className="flex flex-col">
      <h3 className="6xl bg-red mt-2 mb-2">How far back would you like to dive?</h3>
      <Dropdown date_options={date_options} topic_options={topic_options} handleDate={handleDate} handleTopic={handleTopic} />
      <Button color="primary" className="justify-self-center mt-2" onClick={async () => {
        if (!options["topic"].length) {
          alert("Please select at least one topic")
          return
        }
        const res = await PostHistory(user, getHistory, updateUser, options["topic"])
        console.log(res)
      }
      }>
        Submit
      </Button>
    </div>
  )
}
