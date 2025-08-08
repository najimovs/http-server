import { createServer } from "node:http"
import { parse } from "url"
import fs from "fs/promises"

const PORT = 4_000

const server = createServer( async ( req, res ) => {

	const { pathname } = parse( req.url )

	if ( req.method === "GET" ) {

		res.writeHead( 200, { "Content-Type": "application/json" } )

		if ( pathname === "/todos" ) {

			const jsonText = await fs.readFile( "./todos.json", "utf-8" )

			res.end( jsonText )
			return
		}
		else if ( pathname === "/posts" ) {

			const jsonText = await fs.readFile( "./posts.json", "utf-8" )
			res.end( jsonText )
			return
		}
	}
	else if ( req.method === "POST" ) {

		const { query } = parse( req.url, true )

		const jsonText = await fs.readFile( "./posts.json", "utf-8" )
		const data = JSON.parse( jsonText )

		const post = {
			id: data.length + 1,
			title: query.title,
		}

		data.push( post )

		await fs.writeFile( "./posts.json", JSON.stringify( data, null, "\t" ) )

		res.writeHead( 201, { "Content-Type": "application/json" } )
		res.end( JSON.stringify( { message: "POST: OK" } ) )
		return
	}
	else {

		res.writeHead( 405, { "Content-Type": "text/plain" } )
		res.end( "" )
		return
	}

	res.end( JSON.stringify( { message: "OK" } ) )
} )

server.listen( PORT, "127.0.0.1", () => {

	console.log( `Server running at :${ PORT }` )
} )
