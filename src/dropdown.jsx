import React, { useState, useRef, useEffect } from "react";
import { Button } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";

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

export function UserPrompt({ user }) {
  const day_in_milisecond = 24 * 60 * 60 * 1000;

  const date_options = {
    "Last Week": Date.now() - 7 * day_in_milisecond,
    "Last Month": Date.now() - 30 * day_in_milisecond,
    "Three Months": Date.now() - 90 * day_in_milisecond,
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
  function getData() {
    const history = chrome.history.search({ text: '', startTime: date_options[options["date"]] }, function (data) {
      console.log(data)
      return data
    });

    return {
      history: history,
      timeTaken: Date.now()
    }
  }

  async function PostHistory() {
    const history = getData()

    const newHistory = await axios.post(`/user/history`, null, {
      profile_id: fetchUser.googleId,
      history: history.history,
      timeTaken: history.timeTaken
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res) => {
      console.log(res.status)
    })

    const newUser = await axios.post(`/user/update/${user.googleId}`, null, {
      isNew: false,
      preferences: options["topic"]
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res) => {
      console.log(res.status)
    })

    try {
      const [history, user] = await Promise.all([newHistory, newUser])
      console.log(history, user)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    console.log(options)
  }, [options])

  return (
    <div className="flex flex-col">
      <h3 className="6xl bg-red mt-2 mb-2">How far back would you like to dive?</h3>
      <Dropdown date_options={date_options} topic_options={topic_options} handleDate={handleDate} handleTopic={handleTopic} />
      <Button color="primary" className="justify-self-center mt-2" onClick={() => {
        if (!options["topic"].length) {
          alert("Please select at least one topic")
          return
        }
        getData()
      }
      }>
        Submit
      </Button>
    </div>
  )
}
