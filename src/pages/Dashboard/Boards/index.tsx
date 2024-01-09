import ListView from "../../../components/Dashboard/ListView";
import CalenderView from "../../../components/Dashboard/CalenderView";
import ColumnView from "../../../components/Dashboard/ColumnView";
import { useSelector } from "react-redux";
import { chengeView, selectView } from "../../../features/view/viewSlice";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../../../components/Layouts/Dashboard/Header";
import { boards } from "../../../constants/url";
import {
  all,
  clearState,
} from "../../../features/board/boardSlice";
import { useDispatch } from "react-redux";
import { AXIOS } from "../../../config/axios.config";

const Boards: React.FC = (): JSX.Element => {
  const view: string = useSelector(selectView);
  const params = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    AXIOS.get(boards.gets({ wid: params.wid, pid: params.pid })).then(
      (response) => {
        if (response.status === 200) {
          dispatch(all(response.data));
        }
      }
    );
    return () => {
      dispatch(clearState());
      dispatch(chengeView({type: 'column'}))
    };
  }, [params.pid]);

  switch (view) {
    case "list":
      return (
        <>
          <Header />
          <ListView />
        </>
      );
    case "calender":
      return (
        <>
          <Header />
          <CalenderView />
        </>
      );
    default:
      return (
        <>
          <Header />
          <ColumnView />
        </>
      );
  }
};

export default Boards;
