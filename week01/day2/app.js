const http = require("http");
const fs = require("fs");

const server = http.createServer((request, response) => {
	fs.readFile("users.json", "utf-8", (error, data) => {
		if (error) throw error;
		console.log("content", data);
		console.log("parse", JSON.parse(data));
		jsonData = JSON.parse(data);
		let jsonBody = {};
		if (request.method !== "GET") {
			let body = "";
			request.on("data", (chunk) => {
				console.log("chunk", chunk);
				body += chunk;
			});
			request.on("end", () => {
				console.log("data", JSON.parse(body));
				jsonBody = { ...JSON.parse(body) };
				if (request.url === "/createUser") {
					const users = [...jsonData.users];
					const newUser = { ...jsonBody, id: users.length + 1 };
					console.log("new user", newUser);
					const updatedUsers = [...users, newUser];
					fs.writeFile(
						"users.json",
						JSON.stringify({ users: updatedUsers }),
						(error) => {
							if (error) throw error;
							response.writeHead(201, { "content-type": "application/json" });
							response.write(JSON.stringify(newUser));
							response.end();
						}
					);
				}
				if (request.url === "/updateUser") {
					let updatedUser = {};
					const updatedUsers = jsonData.users.map((user) => {
						if (user.id === jsonBody.id) {
							updatedUser = {
								...user,
								name: jsonBody.name,
								country: jsonBody.country,
							};
							return updatedUser;
						}
						return user;
					});
					fs.writeFile(
						"users.json",
						JSON.stringify({ users: updatedUsers }),
						(error) => {
							if (error) throw error;
							response.writeHead(201, { "content-type": "application/json" });
							response.write(JSON.stringify(updatedUser));
							response.end();
						}
					);
				}
				if (request.url === "/deleteUser") {
					const updatedUsers = jsonData.users.filter(
						(user) => user.id !== jsonBody.id
					);
					fs.writeFile(
						"users.json",
						JSON.stringify({ users: updatedUsers }),
						(error) => {
							if (error) throw error;
							response.writeHead(201, { "content-type": "application/json" });
							response.write(JSON.stringify({ message: "User deleted" }));
							response.end();
						}
					);
				}
			});
		} else {
			response.writeHead(200, { "content-type": "application/json" });
			response.write(JSON.stringify(jsonData));
			response.end();
		}
	});
	console.log("client connected");
});

server.listen(3001, () => console.log("Server running at port 3001"));
