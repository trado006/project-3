import React from 'react';
import './chatcontent.css';
class ChatContent extends React.Component{
  constructor(props){
    super(props);
    this.receiveData();
  }
  receiveData(){
    this.state = {
      data:[
        {my:true,content:'toi di choi khong',},
        {my:false,content:'toi di choi khong',},
        {my:true,content:'toi di choi khong',},
        {my:false,content:'toi di choi khong',},
      ]
    }
  }

  render(){
    return (
      <>
      <table style={{width:'100%'}}>
      <tr><td></td><td></td><td></td><td></td></tr>
      {
        this.state.data.map(
          (item, index)=>{
            return item.my? <tr id="my"><td></td><td colSpan="3"><span>{item.content}</span></td></tr>
            : <tr id="partner"><td colSpan="3"><span>{item.content}</span></td></tr>;
          }
        )
      }
      </table>
      </>
    )
  }
}

export default ChatContent;