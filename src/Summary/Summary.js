import '../App.css'
import './Summary.css'

function Summary(props){
    return(
      <div className={props.sidebar ? 'wrapper_fold' :'wrapper_unfold'}>
        <div className={props.sidebar ? 'main_fold' : 'main_unfold'}>
          <p>&nbsp;주요회의내용</p>
          <p>&nbsp;주요 일정</p>
          <p>&nbsp;참고 사이트</p>
        </div>
      </div>
    );
}

export default Summary;