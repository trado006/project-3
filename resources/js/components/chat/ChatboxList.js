import React from 'react';
import 'antd/dist/antd.css';

import { List, Avatar } from 'antd';
import './chatboxlist.css';

class ChatboxList extends React.Component{
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
      <List
        itemLayout="horizontal"
        size="small"
      >
      {this.state.data.map(
        (item, index) =>
        
          <List.Item className="chat-item" key={index}
          style={{borderBottom:'1px solid lightgray'}}
          onClick={e=>alert("hello")}
          >
            <List.Item.Meta
              avatar={<Avatar size="small" style={{background:'#f56a00'}}>{item.name.charAt(0)}</Avatar>}
              title={item.name}
              description="000"
            />
          </List.Item>
        )
      }
      </List>
    );
  }
}

export default ChatboxList;

/*



*/