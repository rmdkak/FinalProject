import React from 'react';
import { Link } from 'react-router-dom';

export const Home = () => {
  return (
    <>
      <div>Home</div>
      <Link to={'/service'}>service</Link>
      <br />
      <Link to={'/post'}>post</Link>
      <br />
      <Link to={'/detail'}>detail</Link>
      <br />
      <Link to={'/community'}>community</Link>
      <br />
      <Link to={'/mypage'}>mypage</Link>
      <br />
      <Link to={'/login'}>login</Link>
      <br />
      <Link to={'/signup'}>signup</Link>
      <br />
    </>
  );
};
