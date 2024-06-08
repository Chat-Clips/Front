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
      console.log(111);
      console.log(rid);
      const res = await api.get('http://localhost:8080/summarize/get_summary?roomId=' + rid);
      console.log(res);
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
