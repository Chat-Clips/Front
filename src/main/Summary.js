import '../App.css';
import { useParams } from 'react-router-dom';
import api from '../apis/api';
import { useEffect, useState } from 'react';
import { wait } from '@testing-library/user-event/dist/utils';

function Summary(props) {
  const { rid } = useParams();
  const [summary, setSummary] = useState('');

  const getSummary = async () => {
    try {
      const res = await api.get(process.env.REACT_APP_API_BASE_URL+'/summarize/get_summary?roomId=' + rid);
      setSummary(res.data.result.summarize);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSummary();
  }, [rid]);

  return (
    <div className={props.sidebar ? 'wrapper_fold' : 'wrapper_unfold'}>
      <div className={props.sidebar ? 'main_fold' : 'main_unfold'}>
        <p>{summary}</p>
      </div>
    </div>
  );
}

export default Summary;
