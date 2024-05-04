import "./Top-bar.css";

function Topbar(props) {
  return (
    <div className={props.sidebar ? "top_bar_fold" : "top_bar_unfold"}>
      &nbsp;&nbsp; {props.title}
    </div>
  );
}

export default Topbar;
