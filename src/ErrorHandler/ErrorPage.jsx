import "./ErrorPage.css";
export default function ErrorPage(props) {
  console.log("ErrorPage", props);
  return (
    <div className={"error-page"}>
      <div className={"oops"}>Oops!</div>
      <div className={"message"}>Something went wrong...</div>
      {props.resetErrorBoundary && (
        <div>
          <button className={"retry-button"} onClick={props.resetErrorBoundary}>
            🔄 Try Again!
          </button>
        </div>
      )}
    </div>
  );
}
