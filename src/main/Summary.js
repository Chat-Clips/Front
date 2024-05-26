import '../App.css'

function Summary(props){
    return(
      <div className={props.sidebar ? 'wrapper_fold' :'wrapper_unfold'}>
        <div className={props.sidebar ? 'main_fold' : 'main_unfold'}>
          <p>{props.note}</p>
        </div>
      </div>
    );
}

export default Summary;