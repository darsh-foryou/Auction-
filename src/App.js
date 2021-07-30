import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import web3 from './web3';
import auction from './auction';



class App extends Component {
  state = {
    auctionManager: '',
    totalBids: '',
    value: '',
    minBid: 0,
    totalAuctions: 0,
    AuctionId: 0,
    Bid: 0,
    bidId: 0,
  };



  async componentDidMount()
  {
    const auctionManager = await auction.methods.auctionManager().call() 
    const totalBids = await auction.methods.totalBids().call()
    const totalAuctions = await auction.methods.totalAuctions().call()
    console.log(totalBids);
    this.setState({auctionManager, totalBids, totalAuctions});
    console.log(totalAuctions)
  }

  onSubmit = async (event) => {
    event.preventDefault()
    const accounts = await web3.eth.getAccounts();
    console.log(accounts);
    
    
    await auction.methods.createAuction(this.state.value, this.state.minBid).send({
      from: accounts[0]
    })
    console.log(this.state) 
  };

makeBid = async (event) => {
  event.preventDefault()
  const accounts = await web3.eth.getAccounts();
  console.log(accounts);
  await auction.methods.bid(this.state.AuctionId, this.state.Bid).send({
    from: accounts[0]
  })
  console.log(this.state) 

};


selectWinner = async (event) => {
  event.preventDefault()
  const accounts = await web3.eth.getAccounts();
  console.log(accounts);
  await auction.methods.setWinner(this.state.bidId, this.state.AuctionId).send({
    from: accounts[0]
  })
  const winner = await auction.methods.winner().call();
  console.log(winner); 

};

closeBid = async (event) => {
  event.preventDefault()
  const accounts = await web3.eth.getAccounts();
  console.log(accounts);
  await auction.methods.closeBid(this.state.AuctionId).send({
    from: accounts[0]
  })
  const auctionDetails = await auction.methods.auctionDetails(this.state.AuctionId).call();
  console.log(auctionDetails); 

};


payBid = async (event) => {
  event.preventDefault()
  const accounts = await web3.eth.getAccounts();
  console.log(accounts);
  await auction.methods.pay(this.state.AuctionId, this.state.Bid).send({
    from: accounts[0]
  })
  console.log("aaaaa");
};

  render(){
    return(
      <div>
        <h2> WELCOME TO AUCTION APP </h2>
        <p>This Auction Is Managed By {this.state.auctionManager} .
        There are total {this.state.totalBids} bidders bidding.
        </p>

        <hr />

        <form onSubmit={this.onSubmit}>
          <h2> Create Auction </h2>
          <div>
            <label> Item Discription  </label>
            <input 
              value = {this.state.value}
              onChange = {event => this.setState({ value: event.target.value})}/>
            <label> MINIMUM BID </label>
            <input type="number"
              value = {this.state.minBid}
              onChange = {event => this.setState({ minBid: parseInt(event.target.value)})}/>
          </div>
          <button>Create Auction </button>
        </form>

        <hr />

        <form onSubmit={this.makeBid}>
          <h2> Bid  </h2>
          <div>
            <label> Create bid   </label>
            <input type="number"
              value = {this.state.AuctionId}
              onChange = {event => this.setState({ AuctionId : parseInt(event.target.value)})}/>
            <label> Amount  </label>
            <input type="number"
              value = {this.state.Bid}
              onChange = {event => this.setState({ Bid: parseInt(event.target.value)})}/>
          </div>
          <button> BID  </button>
        </form>


        <hr />
        <form onSubmit={this.selectWinner}>
          <h2> Select winner  </h2>
          <div>
            <label> Winner Id  </label>
            <input type="number"
              value = {this.state.bidId}
              onChange = {event => this.setState({ bidId : parseInt(event.target.value)})}/>
            <label> Auction Id</label>
            <input type="number"
            value= {this.state.AuctionId}
            onChange = {event => this.setState({ AuctionId : parseInt(event.target.value)})}/>
          </div>
          <button> SELECT WINNER  </button>
        </form>

        <hr />

        <form onSubmit={this.payBid}>
          <h2> Pay Bid </h2>
          <div>
            <label> Auction ID  </label>
            <input type="number"
              value = {this.state.AuctionId}
              onChange = {event => this.setState({ AuctionId : parseInt(event.target.value)})}/>
            <label> Bid Amount</label>
            <input type="number"
              value = {this.state.Bid}
              onChange = {event => this.setState({ Bid : parseInt(event.target.value)})}/>
            
          </div>
          <button> PAY  </button>
        </form>

        <hr />
        <form onSubmit={this.closeBid}>
          <h2> CLOSE BID  </h2>
          <div>
            <label> Auction ID   </label>
            <input type="number"
              value = {this.state.AuctionId}
              onChange = {event => this.setState({ AuctionId : parseInt(event.target.value)})}/>
            
          </div>
          <button> CLOSE BID  </button>
        </form>

        <hr />
        
      </div>
    )
  }
}
export default App;
