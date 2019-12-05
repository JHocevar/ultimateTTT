(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[0],{10:function(e,t,r){e.exports=r(17)},15:function(e,t,r){},17:function(e,t,r){"use strict";r.r(t);var a=r(0),n=r.n(a),s=r(8),i=r.n(s),l=(r(15),r(16),r(9)),u=r(1),o=r(2),c=r(4),d=r(3),h=r(5),m=r(7);var p=function(e){return n.a.createElement("button",{className:m({square:!0,valid:e.id===e.currBoard||-1===e.currBoard,"winner-x":"X"===e.winners[e.id],"winner-o":"O"===e.winners[e.id]}),onClick:e.onClick},e.value)},v=function(e){function t(){return Object(u.a)(this,t),Object(c.a)(this,Object(d.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(o.a)(t,[{key:"renderSquare",value:function(e){var t=this;return n.a.createElement(p,{id:this.props.id,currBoard:this.props.currentBoard,value:this.props.value[e],onClick:function(){return t.props.onClick(e)},winners:this.props.winners})}},{key:"render",value:function(){return n.a.createElement("div",{className:"board"},n.a.createElement("div",{className:"board-row"},this.renderSquare(0),this.renderSquare(1),this.renderSquare(2)),n.a.createElement("div",{className:"board-row"},this.renderSquare(3),this.renderSquare(4),this.renderSquare(5)),n.a.createElement("div",{className:"board-row"},this.renderSquare(6),this.renderSquare(7),this.renderSquare(8)))}}]),t}(n.a.Component),b=r(7),f=function(e){function t(){return Object(u.a)(this,t),Object(c.a)(this,Object(d.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(o.a)(t,[{key:"renderBoard",value:function(e){var t=this;return n.a.createElement(v,{value:this.props.boards[e],onClick:function(r){return t.props.onClick(e,r)},currentBoard:this.props.currentBoard,id:e,winners:this.props.winners,className:b({"winner-x":!0})})}},{key:"render",value:function(){return n.a.createElement("div",{className:"super-board"},n.a.createElement("div",{className:"super-board-row"},this.renderBoard(0),this.renderBoard(3),this.renderBoard(6)),n.a.createElement("div",{className:"super-board-row"},this.renderBoard(1),this.renderBoard(4),this.renderBoard(7)),n.a.createElement("div",{className:"super-board-row"},this.renderBoard(2),this.renderBoard(5),this.renderBoard(8)))}}]),t}(n.a.Component),E=function(e){function t(){return Object(u.a)(this,t),Object(c.a)(this,Object(d.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){return n.a.createElement("nav",{className:"float-left"},n.a.createElement("div",{className:"sidebar-sticky"},n.a.createElement("div",null,"This is the sidebar"),n.a.createElement("div",{className:"radio"},n.a.createElement("label",null,n.a.createElement("input",{type:"radio",name:"values"})," Value 1")),n.a.createElement("div",null,n.a.createElement("label",{className:"radio"},n.a.createElement("input",{type:"radio",name:"values"})," Value 2")),n.a.createElement("div",null,n.a.createElement("label",{className:"radio"},n.a.createElement("input",{type:"radio",name:"values"})," Value 3"))))}}]),t}(n.a.Component),w=function(e){function t(){return Object(u.a)(this,t),Object(c.a)(this,Object(d.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(o.a)(t,[{key:"renderStatus",value:function(){var e,t=this.props.winner;return e=t?"The winner is "+t+"!":"Current Player: "+(this.props.xIsNext?"X":"O"),n.a.createElement("h1",{className:"status text-center"},e)}},{key:"render",value:function(){return n.a.createElement("div",null,this.renderStatus())}}]),t}(n.a.Component),y=function(e){function t(){var e;Object(u.a)(this,t),(e=Object(c.a)(this,Object(d.a)(t).call(this))).handleClick=function(t,r){e.state.useAi&&!e.state.xIsNext||e.makeMove(t,r)};for(var r=Array(9).fill(null),a=0;a<9;a++)r[a]=Array(9).fill(null);return e.state={boards:r,winners:Array(9).fill(null),xIsNext:!0,currentBoard:-1,winner:null,useAi:!0},e}return Object(h.a)(t,e),Object(o.a)(t,[{key:"randomPlay",value:function(){var e=this.getValidMoves(),t=e[Math.floor(Math.random()*e.length)];this.state.useAi&&!this.state.xIsNext&&this.makeMove(t[0],t[1])}},{key:"makeMove",value:function(e,t){var r=this.state.boards.slice(),a=this.state.winners.slice(),n=this.state.currentBoard;if(!k(a)&&(n===e||-1===n)){if(r[e][t])return;r[e][t]=this.state.xIsNext?"X":"O";for(var s=0;s<9;s++)a[s]||(a[s]=k(r[s]));this.isBoardFull(t)&&(t=-1),this.setState({boards:r,winners:a,xIsNext:!this.state.xIsNext,currentBoard:t})}}},{key:"isBoardFull",value:function(e){for(var t=this.state.boards[e],r=0;r<9;r++)if(!t[r])return!1;return!0}},{key:"getValidMoves",value:function(){var e=this.state.boards,t=this.state.currentBoard,r=[];if(-1===t)for(var a=0;a<9;a++)for(var n=0;n<9;n++)e[a][n]||r.push([a,n]);else for(var s=0;s<9;s++)e[t][s]||r.push([t,s]);return r}},{key:"updateWinner",value:function(){var e=k(this.state.winners);e&&-2!==this.state.currentBoard&&(this.setState({winner:e}),this.setState({currentBoard:-2}))}},{key:"componentDidUpdate",value:function(){this.updateWinner(),this.randomPlay()}},{key:"render",value:function(){return n.a.createElement(n.a.Fragment,null,n.a.createElement(w,{winner:this.state.winner,xIsNext:this.state.xIsNext}),n.a.createElement(E,null),n.a.createElement("div",{className:"game"},n.a.createElement(f,{onClick:this.handleClick,boards:this.state.boards,winners:this.state.winners,xIsNext:this.state.xIsNext,currentBoard:this.state.currentBoard,winner:this.state.winner})))}}]),t}(n.a.Component);function k(e){for(var t=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]],r=0;r<t.length;r++){var a=Object(l.a)(t[r],3),n=a[0],s=a[1],i=a[2];if(e[n]&&e[n]===e[s]&&e[n]===e[i])return e[n]}return null}i.a.render(n.a.createElement(y,null),document.getElementById("root"))}},[[10,1,2]]]);
//# sourceMappingURL=main.62afac02.chunk.js.map