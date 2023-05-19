import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import { GetUsersPermissionList } from "../actions/questioerAction";

const UserPermissionRoute = (props) => {
  const dispatch = useDispatch();
  const userPermissionList = useSelector(
    (state) => state.getuserlistReducer
  ).usersList;
  const params = useParams();
  const id = params.id;
  console.log(id);
  let newFinalPermission = [];
  userPermissionList.forEach((element) => {
    newFinalPermission.push(element.id.toString());
  });

  useEffect(() => {
    dispatch(GetUsersPermissionList());
  }, []);

  return newFinalPermission.includes(id) ? (
    props.children
  ) : (
    <Navigate to="dashboard" />
  );
};
export default UserPermissionRoute;
