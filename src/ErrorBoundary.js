import { Component } from "react";

class ErrorBoundary extends Component{
    constructor(){
        super()
        this.state = {
            hasError: false
        }
    }

    static getDerivedStateFromError(error){
        // This function returns an object which get merge to state
        return {
            hasError: true
        }
    }

    componentDidCatch(error, errorInfo){
        //In this function you can catch the errors
        //If you have to maintain some logs means at what time what error was came like that
    }
    

    render(){
        if(this.state.hasError){
            return (
                <h1>Oops! Some Error Occured</h1>
            )
        } else{
            return this.props.children
        }
    }
}
export default ErrorBoundary
//This will work in development but for little amount of time, it will work in production