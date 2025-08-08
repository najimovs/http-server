import { createServer } from "node:http"
import { parse } from "url"
import fs from "fs/promises"

const PORT = 4_000

const server = createServer( async ( req, res ) => {

	const { pathname } = parse( req.url )

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

	res.end( JSON.stringify( { message: "OK" } ) )
} )

server.listen( PORT, "127.0.0.1", () => {

	console.log( `Server running at :${ PORT }` )
} )
