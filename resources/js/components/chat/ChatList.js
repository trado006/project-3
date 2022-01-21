import React from 'react';
import 'antd/dist/antd.css';

import { List, Avatar } from 'antd';
import './chatlist.css';



class ChatList extends React.Component{
  constructor(props){
    super(props);
    this.getData();
  }
  getData(){
    this.state = {
      data:[
      {id:'1',name: 'do kim tra',},
      {id:'2',name: 'nguyen van tuan',},
      {id:'1',name: 'do kim tra',},
      ]
    };
  }
  render(){
    return (
      <div className="chat">
        <div class="card contacts_card">
          <div class="card-header">
              <div class="input-group">
                  <input type="text" placeholder="Search..." name="" class="form-control search" />
                  <div class="input-group-prepend">
                      <span class="input-group-text search_btn" onClick={alert("Hello")} ><i class="fas fa-search"></i></span>
                  </div>
              </div>
          </div>
          <div class="card-body contacts_body">
            <ui class="contacts">
            <li class="active">
                <div class="d-flex bd-highlight">
                    <div class="img_cont">
                        <img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" class="rounded-circle user_img" />
                        <span class="online_icon"></span>
                    </div>
                    <div class="user_info">
                        <span>Khalid</span>
                        <p>Kalid is online</p>
                    </div>
                </div>
            </li>
            <li>
                <div class="d-flex bd-highlight">
                    <div class="img_cont">
                        <img src="https://2.bp.blogspot.com/-8ytYF7cfPkQ/WkPe1-rtrcI/AAAAAAAAGqU/FGfTDVgkcIwmOTtjLka51vineFBExJuSACLcBGAs/s320/31.jpg" class="rounded-circle user_img" />
                        <span class="online_icon offline"></span>
                    </div>
                    <div class="user_info">
                        <span>Taherah Big</span>
                        <p>Taherah left 7 mins ago</p>
                    </div>
                </div>
            </li>
            <li>
                <div class="d-flex bd-highlight">
                    <div class="img_cont">
                        <img src="https://i.pinimg.com/originals/ac/b9/90/acb990190ca1ddbb9b20db303375bb58.jpg" class="rounded-circle user_img" />
                        <span class="online_icon"></span>
                    </div>
                    <div class="user_info">
                        <span>Sami Rafi</span>
                        <p>Sami is online</p>
                    </div>
                </div>
            </li>
            <li>
                <div class="d-flex bd-highlight">
                    <div class="img_cont">
                        <img src="http://profilepicturesdp.com/wp-content/uploads/2018/07/sweet-girl-profile-pictures-9.jpg" class="rounded-circle user_img" />
                        <span class="online_icon offline"></span>
                    </div>
                    <div class="user_info">
                        <span>Nargis Hawa</span>
                        <p>Nargis left 30 mins ago</p>
                    </div>
                </div>
            </li>
            <li>
                <div class="d-flex bd-highlight">
                    <div class="img_cont">
                        <img src="https://static.turbosquid.com/Preview/001214/650/2V/boy-cartoon-3D-model_D.jpg" class="rounded-circle user_img" />
                        <span class="online_icon offline"></span>
                    </div>
                    <div class="user_info">
                        <span>Rashid Samim</span>
                        <p>Rashid left 50 mins ago</p>
                    </div>
                </div>
            </li>
            </ui>
          </div>
          <div class="card-footer"></div>
        </div>
      </div>
      )
  }
}


export default ChatList;