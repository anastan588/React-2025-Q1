import React from 'react';

export class Spinner extends React.Component {
  render() {
    return (
      <div className="border-8 border-white border-opacity-30 border-t-[10px] border-t-rose-300 rounded-full w-24 h-24 animate-spin mx-auto"></div>
    );
  }
}
