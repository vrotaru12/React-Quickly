import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';

class Menu extends React.Component{
    render(){
        let menus = [
            'Home',
            'About',
            "Services", 
            'Contacts'
        ]
        return(
            <div>
                {menus.map((i, v) => (
                <div key={i}>
                    <Link label={i}/>
                    </div>
                    ))
                }
            </div>
        );
    }
}

class Link extends React.Component{
    render(){
        let url = '/' + this.props.label;
        return(
            <div>
                <a href={url}> {this.props.label}</a>
            </div>
        );
    }

}

class Tooltip extends  React.Component{
    constructor(props){
        super(props);
       this.tooltipNode = React.createRef();
        this.state = {
            opacity: false,
            top: this.tooltipNode.offsetTop,
            left: this.tooltipNode.offsetLeft,
        }
    }

    toggle(i){
      let tooltipNode = ReactDOM.findDOMNode(this)
         this.setState({
             opacity: !this.state.opacity,
             top: tooltipNode.offsetTop,
             left: tooltipNode.offsetLeft
         })
     }

    render(){
        let style = {
           zIndex: (this.state.opacity) ? 1000 : -1000,
           opacity: +this.state.opacity,
           top: (this.state.top || 0) + 15,
           left: (this.state.left || 0) - 2
        }

        return(
            <div style={{display: 'inline'}}>
                <span style={{color: 'green'}} onMouseEnter={(i) => this.toggle(i)} onMouseOut={(i) => this.toggle(i)} ref={this.tooltipNode} >
                    {this.props.children}
                </span>
                <div className="tooltip bottom" style={style} role="tooltip">
                    <div className="tooltip-arrow">
                        <div className="tooltip-inner">
                            {this.props.text}
                        </div>
                    </div>
                </div>
                
            </div>
        );
    }
}


ReactDOM.render(<div>
    <Tooltip text="Master Express.js-The Node.js Framework For Your Web Development">Pro Express.js</Tooltip> was published in 2014. It was one of the first books on v4.x. And it was my second book published with Apress
    after <Tooltip text="Practical Node.js: Building Real-World Scalable Web Apps">Practical Node.js</Tooltip>.
    ...
    The main focus of this post is to compare the four Node.js/Io.js frameworks: <Tooltip text="HTTP API server">Hapi</Tooltip>, <Tooltip text="Release the Kraken!">Kraken</Tooltip>, <Tooltip text="Sail away">Sails.js</Tooltip> and <Tooltip text="IBM of frameworks">Loopback</Tooltip>. There are many other frameworks to consider, but I had to draw the line somewhere.
  </div>,
 document.getElementById('tooltip'));

 ReactDOM.render(
     <Menu/> ,
 document.getElementById('menu'));
