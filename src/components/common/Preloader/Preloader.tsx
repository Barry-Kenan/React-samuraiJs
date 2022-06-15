import React from "react";
import {Spin} from "antd";
import { LoadingOutlined } from '@ant-design/icons';


const antIcon = <LoadingOutlined style={{ fontSize: 100 }} spin />
const Preloader = () => <Spin indicator={antIcon} />

export default Preloader;