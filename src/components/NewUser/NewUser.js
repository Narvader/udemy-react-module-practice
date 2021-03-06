import React, { useState } from 'react';
import './NewUser.css';
import Card from '../UI/Card';
import Modal from './Modal';

const NewUser = (props) => {

    const [userInputs, setUserInputs] = useState({
        enteredUserName: '',
        enteredUserAge: ''
    });
    const [invalidInput, setInvalidInput] = useState();
    const [modalVisible, setModalVisible] = useState(false);

    const usernameChangeHandler = (e) => {
        setUserInputs({
          ...userInputs,
          enteredUserName: e.target.value
        });

    }

    const ageChangeHandler = (e) => {
        setUserInputs({
            ...userInputs,
            enteredUserAge: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newUser = {
            name: userInputs.enteredUserName,
            age: userInputs.enteredUserAge,
            id: ((Math.random() * 100) + 1).toString()
        };

        handleInfo(newUser);
        
    }

    const handleInfo = (newuser) => {
        if (userInputs.enteredUserName.length === 0 && userInputs.enteredUserAge.length === 0) {
            setInvalidInput(0);
            setModalVisible(true);
        } else if (userInputs.enteredUserName.length === 0) {
            setInvalidInput(1);
            setModalVisible(true);
        } else if (userInputs.enteredUserAge.length === 0) {
            setInvalidInput(2);
            setModalVisible(true);
        } else{
            setInvalidInput();
            setModalVisible(false);
            props.onAddUser(newuser);
            setUserInputs({
                enteredUserName: '',
                enteredUserAge: ''
            });
        }
    };

    const handleClick = () => {
        setModalVisible(false);
    }

    return (
        <>
            <Card className="userForm">
                <form onSubmit={handleSubmit}>
                    <div className='new-user__controls'>
                        <div className='new-user__control'>
                            <label htmlFor='username'>Username</label>
                            <input type='text' id='username' value={userInputs.enteredUserName} onChange={usernameChangeHandler} />
                        </div>
                        <div className='new-user__control'>
                            <label htmlFor='age'>Age (Years)</label>
                            <input type='number' id='age' maxLength="3" value={userInputs.enteredUserAge} onChange={ageChangeHandler} />
                        </div>
                    </div>
                    <div className='new-user__actions'>
                        <button type='submit' className='cta-btn'>Add User</button>
                    </div>
                </form>
            </Card>
            {modalVisible && 
                <>
                    <Modal inputStatus={invalidInput} onConfirm={handleClick} />
                </>
            }
        </>
    )
};

export default NewUser;