import React, { useState } from 'react';
import './profile.css';

//Hooks
export function Profile() {
    return (
        <div className={'profileWrapper'} style={{ marginTop: '300px' }}>
            <div className="sidebar">
                <div className="changeInfo">修改個人資料</div>
                <div className="introduceFriend">推薦朋友使用</div>
                <div className="deleteAccount">刪除帳戶</div>
            </div>
            <div className="shownResult">
                <h2>個人資料</h2>
                {/*rendered by JS*/}
            </div>
        </div>
    );
}
