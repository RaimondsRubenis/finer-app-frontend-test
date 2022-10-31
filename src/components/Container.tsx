import React, { Dispatch, SetStateAction } from 'react';

interface containerProps {
  id: number,	
  show: boolean,
  handleNext: Dispatch<SetStateAction<number>>,
  title: String,
  children: JSX.Element | JSX.Element[]
}

export const Container = ({ id, show, handleNext, title, children }: containerProps) => 
		<div className="container-background">
			<div className="container-toggle-title " onClick={() => handleNext(id)}>{title}</div>
				<div className={"position-relative " + (show ? "shown" : "hidden")} >
				<div style={{width: 400, margin: 5}}>
					{children}
				</div>
				<button className="next-button" onClick={() => handleNext(id+1)}>Next &gt;</button>
			</div>
		</div>


