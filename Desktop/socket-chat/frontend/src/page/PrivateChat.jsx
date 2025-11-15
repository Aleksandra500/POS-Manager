import { useEffect, useState } from 'react';
import {
	getPrivateMessages,
	sendPrivateMessage,
} from '../services/privateMessageService';
import socket from '../socket'; 

export default function PrivateChat({ currentUser, targetUser, onClose }) {
	const [messages, setMessages] = useState([]);
	const [text, setText] = useState('');

	useEffect(() => {
		const roomId = [currentUser, targetUser].sort().join('-');

		socket.emit('joinRoom', { currentUser, targetUser });

		socket.on('receivePrivateMessage', (msg) => {
			if (msg.roomId === roomId) {
				setMessages((prev) => [...prev, msg]);
			}
		});

		const fetchMessages = async () => {
			try {
				const data = await getPrivateMessages(roomId);
				setMessages(data);
			} catch (err) {
				console.error(err);
			}
		};
		fetchMessages();

		return () => {
			socket.off('receivePrivateMessage');
		};
	}, [currentUser, targetUser]);

	const handleSend = async (e) => {
		e.preventDefault();
		if (!text.trim()) return;

		const roomId = [currentUser, targetUser].sort().join('-');
		const message = { currentUser, targetUser, text };

		socket.emit('sendPrivateMessage', message);
		setText('');

		try {
			const saved = await sendPrivateMessage({
				roomId,
				sender: currentUser,
				receiver: targetUser,
				text,
			});

			setMessages((prev) => [...prev, saved]);
			setText('');
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<div className='flex flex-col h-full bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 p-2 sm:p-4 rounded-2xl shadow-lg'>
			{/* Header */}
			<div className='flex justify-between items-center mb-2 sm:mb-4'>
				<h2 className='text-lg sm:text-xl font-bold text-purple-700'>
					💌 Chat with {targetUser}
				</h2>
				<button
					onClick={onClose}
					className='bg-gray-200 hover:bg-gray-300 px-2 py-1 text-sm sm:px-3 sm:py-1.5 rounded-full shadow'>
					Close
				</button>
			</div>

			{/* Messages */}
			<div className='flex-1 overflow-y-auto mb-2 sm:mb-4 p-2 sm:p-3 bg-white rounded-2xl shadow-inner'>
				{messages.length === 0 ? (
					<p className='text-gray-400 text-center'>Nema poruka 😄</p>
				) : (
					messages.map((msg) => (
						<div
							key={msg.id || msg.timestamp}
							className={`mb-2 p-2 max-w-[70%] rounded-xl shadow ${
								msg.sender === currentUser
									? 'bg-blue-200 self-end'
									: 'bg-pink-200 self-start'
							}`}
						>
							<strong className='text-purple-800'>
								{msg.sender}:
							</strong>{' '}
							<span>{msg.text}</span>
						</div>
					))
				)}
			</div>

			{/* Input */}
			<form onSubmit={handleSend} className='flex gap-2'>
				<input
					type='text'
					value={text}
					onChange={(e) => setText(e.target.value)}
					placeholder='Unesi poruku...'
					className='flex-1 border rounded-full p-2 sm:p-3 text-sm sm:text-base outline-none shadow-md'
				/>
				<button
					type='submit'
					className='bg-purple-500 hover:bg-purple-600 text-white rounded-full px-4 sm:px-6 py-2 sm:py-2 shadow-md text-sm sm:text-base'>
					Pošalji
				</button>
			</form>
		</div>
	);
}
