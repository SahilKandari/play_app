import toast from "react-hot-toast";

export const apiError = (err) => {
  if (err.response) {
    // The request was made and the server responded
    if (err.response.data) {
        // Attempt to parse the HTML response to extract the error message
        const errorRegex = /<pre>Error: (.+?)<br>/;
        const match = errorRegex.exec(err.response.data);
        if (match) {
            const errorMessage = match[1];
            toast.error(errorMessage); // show error message to the user
        } else {
            toast.error("An error occurred while processing your request.");
        }
    } else {
        toast.error("An error occurred while processing your request.");
    }
  } else if (err.request) {
    // The request was made but no response was received
    console.error(err.request); // log the request object
    toast.error("No response received from the server.");
  } else {
    // Something happened in setting up the request that triggered an Error
    console.error('Error', err.message); // log the error message
    toast.error("An error occurred while processing your request.");
  }
}