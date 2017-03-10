\section{Usage}
\subsection{How to run the code on local machine}
At first clone the repository from \url{https://github.com/martinavagyan/zeeguu-exercises.git}\\
In order to run the code on the local machine, we need to install the following dependencies: Python Virtual environment, $Flask$, $Gunicorn$, $Requests$. \\ \\
The following tutorial shows how to install $virtualenv$ and $Flask$: \\ 
\url{http://flask.pocoo.org/docs/0.12/installation/} \\ \\
After installing virtual environment in the project folder, activate it using:
%
\begin{lstlisting}
venv/Scripts/activate
\end{lstlisting}
\textbf{\textit{ Make sure the environment is activated before proceeding with the instructions}}\\ \\
To install $gunicorn$ use the following command:
\begin{lstlisting}
pip install gunicorn
\end{lstlisting}
More details here: \\ 
\url{http://docs.gunicorn.org/en/stable/install.html} \\ \\
To install the $requests$ package simply do:
\begin{lstlisting}
pip install requests
\end{lstlisting} 
\ \\
Afterwards, you need to (re)generate the requirements file: 
\begin{lstlisting}
pip freeze > requirements.txt 
\end{lstlisting} 
And then save it:
\begin{lstlisting}
pip install -r requirements.txt
\end{lstlisting} 
\ \\
A batch file ($batchfile.bat$) is provided to easily activate the virtual environment and start the local host, given that all the previous installations are successfully completed.
\subsection{Heroku Deployment}
The code is already deployed on the $Heroku$ server\footnote{https://www.heroku.com/}. The deployment is done through Github. \\
The link to our app: \\
\url{zeeguu.herokuapp.com} \\
The repository connected to heroku is: \\
\url{https://github.com/martinavagyan/practice-as-a-service} \\
In order to contribute to the project you can fork the repository, connect it to heroku to have your own running version.\\
How to deploy a Phyton app on Heroku: \\ 
\url{https://devcenter.heroku.com/articles/getting-started-with-python#introduction} \\
