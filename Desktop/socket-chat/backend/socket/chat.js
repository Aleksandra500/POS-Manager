module.exports = (io) => {
	io.on('connection', (socket) => {
		console.log('🔌 User connected:', socket.id);
		socket.on('chatMessage', (msg) => {
			console.log('🌐 Global message:', msg);
			io.emit('chatMessage', msg);
		});

		socket.on('joinRoom', ({ currentUser, targetUser }) => {
			const roomId = [currentUser, targetUser].sort().join('-');
			socket.join(roomId);
			console.log(`👥 ${currentUser} joined room ${roomId}`);
		});

		socket.on(
			'sendPrivateMessage',
			({ currentUser, targetUser, text }) => {
				const roomId = [currentUser, targetUser].sort().join('-');
				const message = {
					sender: currentUser,
					text,
					timestamp: Date.now(),
					roomId,
				};

				console.log(`📩 ${currentUser} -> ${targetUser}: ${text}`);

				io.to(roomId).emit('receivePrivateMessage', message);
			}
		);

		socket.on('disconnect', () => {
			console.log('❌ User disconnected:', socket.id);
		});
	});
};
