import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { IoIosSend } from "react-icons/io";
import Markdown from "./Markdown ";
const SECRET_KEY = import.meta.env.VITE_GEMINI_API_KEY
interface Input {
    inputMessage: string
}
interface InputMessages {
    "client": string
    "gemini"?: string
}
const Form = () => {
    const [inputMessages, setInputMessages] = useState<InputMessages[]>([])
    console.log(inputMessages, "inputMessages");
    const {
        register,
        handleSubmit,
        watch,
        reset
    } = useForm<Input>()
    const onSubmit: SubmitHandler<Input> = (data) => {
        reset();
        setInputMessages((prev) => [...prev, { client: data?.inputMessage, gemini: "" }])
        generateContentFromGemini(data.inputMessage);
    }
    const generateContentFromGemini = async (prompt: string) => {
        const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${SECRET_KEY}`;

        try {
            const response = await fetch(endpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    contents: [
                        {
                            parts: [
                                {
                                    text: prompt,
                                },
                            ],
                        },
                    ],
                }),
            });

            const data = await response.json();
            const result = data?.candidates?.[0]?.content?.parts?.[0]?.text;
            console.log(result, "result");
            setInputMessages((prev) => [...prev, { gemini: data?.candidates?.[0]?.content?.parts?.[0]?.text, client: "" }])

            return result || "No response from Gemini.";
        } catch (error) {
            console.error("Gemini API Error:", error);
            return "Error occurred while generating content.";
        }
    }

    return (
        <>
            <div className="flex flex-col gap-2 w-full h-[90%] p-5">
                {inputMessages.map((message, index) => (
                    <div key={index}>
                        {message.client && (
                            <div className="flex justify-end">
                                <p className="bg-[#404045] text-white p-4 rounded-md leading-relaxed space-y-4 border-none ring-0">
                                    {message.client}
                                </p>
                            </div>
                        )}
                        {message.gemini && (
                            <div className="flex justify-start">
                                <div className="p-2 rounded max-w-[50vw] prose prose-sm">
                                    <Markdown text={message.gemini} />
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <div className="relative w-full  flex justify-center items-center">
                <form onSubmit={handleSubmit(onSubmit)} className="fixed bottom-5  flex items-center justify-between gap-2 h-25 w-[50%]  shadow-2xl rounded-lg py-2 bg-[#404045]">
                    <input type="text" {...register("inputMessage")} placeholder="Ask something..." className="w-[90%] px-5 rounded-md  bg-transparent outline-none " />
                    <button type='submit' disabled={!watch("inputMessage")} className=" hover:cursor-pointer disabled:cursor-not-allowed ">
                        <IoIosSend className="h-7 w-7 mr-3" />

                    </button>
                </form>
            </div>
        </>

    )
}

export default Form