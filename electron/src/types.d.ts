interface Repository {
    name: string;
    path: string;
    key: string;
    hisList: History[];
    promptList: PromptLine[];
}

interface PromptLine {
    type: "result" | "cmd";
    text: string;
    key: string;
}

interface History {
    graph: string;
    comment: string;
    date: string;
    author: string;
    commit: string;
    key: string;
}

interface Cmd {
    text: string;
    key: string;
}

interface Theme {
    mode: "dark" | "white";
    keyColor: string;
    fontColor: string;
    bgColor: string;
}
