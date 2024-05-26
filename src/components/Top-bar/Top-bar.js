import './Top-bar.css'

function Topbar(props){
  let title=null;
  if(props.title===null){
    title="#main"
  }
  else{
    title=props.title
  }

  return(
    <div className={props.sidebar ? 'top_bar_fold' :'top_bar_unfold'}>
       &nbsp;&nbsp; {title}/{props.roomId}
    </div>
  );
}

export default Topbar;