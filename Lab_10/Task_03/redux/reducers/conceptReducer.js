import { LOAD_CONCEPTS } from "../actions/conceptActions"

const initialState = {
  concepts: [
    {
      id: "state",
      name: "State",
      description:
        "State allows React components to change their output over time in response to user actions, network responses, and anything else. It's managed within the component and is essential for interactive UIs.",
      examples: [
        "Using useState hook: const [count, setCount] = useState(0);",
        "Updating state based on previous state: setCount(prevCount => prevCount + 1);",
      ],
    },
    {
      id: "props",
      name: "Props",
      description:
        "Props (short for properties) are read-only inputs to components. They allow passing data from parent to child components.",
      examples: [
        'Passing a prop: <Welcome name="Sara" />',
        "Accessing a prop: function Welcome(props) { return <h1>Hello, {props.name}</h1>; }",
        "Using prop-types for validation (optional concept).",
      ],
    },
    {
      id: "hooks",
      name: "Hooks",
      description:
        'Hooks are functions that let you "hook into" React state and lifecycle features from function components.',
      examples: [
        "useState for state management.",
        "useEffect for side effects.",
        "useContext for accessing context.",
        "Custom Hooks for reusable logic.",
      ],
    },
    {
      id: "jsx",
      name: "JSX",
      description:
        "JSX is a syntax extension for JavaScript that looks similar to HTML. It allows you to write HTML-like code in your JavaScript files.",
      examples: [
        "Basic JSX: const element = <h1>Hello, world!</h1>;",
        "JSX with expressions: const element = <h1>Hello, {name}!</h1>;",
        'JSX with attributes: const element = <img src={user.avatarUrl || "/placeholder.svg"} alt={user.name} />;',
      ],
    },
    {
      id: "components",
      name: "Components",
      description:
        "Components are the building blocks of React applications. They let you split the UI into independent, reusable pieces.",
      examples: [
        "Function component: function Welcome() { return <h1>Hello!</h1>; }",
        "Class component: class Welcome extends React.Component { render() { return <h1>Hello!</h1>; } }",
        "Composing components: function App() { return <div><Welcome /><Welcome /></div>; }",
      ],
    },
  ],
}

const conceptReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_CONCEPTS:
      return {
        ...state,
      }
    default:
      return state
  }
}

export default conceptReducer
