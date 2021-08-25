import React from "react"

class Meme extends React.Component{

    constructor(){
        super()
        this.state = {
            topText: "",
            bottomText: "",
            imgSrc: "http://i.imgflip.com/1bij.jpg", // default image src
            allMemes: []
        }

        this.handlechange = this.handlechange.bind(this)
        this.handlesubmit = this.handlesubmit.bind(this)

    }

    componentDidMount(){

        fetch("https://api.imgflip.com/get_memes")
        .then(response=>response.json())
        .then(data=>{
        
            const {memes} = data.data

            this.setState({

                allMemes: memes
            
            })
        })

    }

    handlechange(event){

        const {name,value}= event.target

        this.setState({
            [name]: value
        })

    }

    handlesubmit(event){
        event.preventDefault();

        const randomIndex = Math.floor(Math.random()*this.state.allMemes.length);
        const randomMeme = this.state.allMemes[randomIndex].url;

       
        this.setState({
            imgSrc:randomMeme
        })
    }

    render(){
        return (
            <div className="container">
                
                <form className="meme-form" onSubmit={this.handlesubmit}>

                    <input type="text" name="topText" placeholder="Write top ext..." onChange={this.handlechange}/>

                    <input type="text" name="bottomText" placeholder="Write bottom text..." onChange={this.handlechange}/>

                    <button>Generate</button>

                </form>

                <div className="meme">
                    <img src={this.state.imgSrc}/>
                    <h1 className="toptext"><b>{this.state.topText}</b></h1>
                    <h1 className="bottomtext"><b>{this.state.bottomText}</b></h1>
                </div>

            </div>

            
        )
    }
}

export default Meme