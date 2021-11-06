// const element = {
//   type: "h1",
//   props: {
//     title: "foo",
//     children: "Hello",
//   },
// }

 

// const node = document.createElement(element.type);
// node["title"] = elements.props.title;
// const text = document.createTextNode("");
// text["nodeValue"] = element.props.children;
// node.appendChild(text);
// container.appendChild(node);

function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.map((child) =>
        typeof child === "object" ? child : createTextElement(child)
      ),
    },
  };
}

function createTextElement(text) {
  return {
    type: "TEXT_ELEMENT",
    props: {
      nodeValue: text,
      children: [],
    },
  };
}

function render(element, container) {
  const dom =
    element.type === "TEXT_ELEMENT"
      ? document.createTextNode("")
      : document.createElement(element.type);

  const isProperty = (key) => key !== "children";

  Object.keys(element.props)
    .filter(isProperty)
    .forEach((name) => {
      dom[name] = element.props[name];
    });

  element.props.children.forEach((child) => {
    render(child, dom);
  });
  container.appendChild(dom);
}

const Respond = {
  createElement,
  render,
};

const container = document.getElementById("root");

const element = Respond.createElement(
  "div",
  { id: "foo" },
  Respond.createElement("a", null, "bar"),
  Respond.createElement("b")
);

Respond.render(element, container);
