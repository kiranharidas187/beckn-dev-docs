// src/components/layout.tsx
// The layout to use to render all content.

import * as React from 'react'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'
import { Layout } from 'antd'

import { Header } from './header'
import { Sidebar } from './sidebar'

import { pathPrefix } from '../../gatsby-config'

const { Sider, Content } = Layout

export function RootLayout({ children }: React.PropsWithChildren<{}>) {
	return (
		<StaticQuery
			query={graphql`
				query SiteTitleQuery {
					site {
						siteMetadata {
							title
						}
					}
					allFile {
						edges {
							node {
								name
								relativePath
							}
						}
					}
				}
			`}
			render={(data) => {
				const allPosts = data.allFile.edges.map(
					(edge: any) => edge.node.relativePath
				)
				let onPostPage
				if (typeof window !== 'undefined') {
					const path = window.location.pathname.replace(
						pathPrefix.slice(0, -1),
						''
					)
					if (
						allPosts.indexOf(path) >= 0 ||
						allPosts.indexOf(path.slice(0, -1)) >= 0
					) {
						onPostPage = true
					} else {
						onPostPage = false
					}
				}

				const { title } = data.site.siteMetadata

				return (
					<div style={{ width: '100%', padding: 0, overflow: 'hidden' }}>
						<Helmet
							title={data.site.siteMetadata.title}
							meta={[
								{ name: 'description', content: 'Sample' },
								{ name: 'keywords', content: 'sample, something' },
							]}
						>
							<html lang="en" />
						</Helmet>
						<Header siteTitle={title} />

						<div
							style={{
								display: 'grid',
								gridTemplateColumns: 'auto 1fr auto',
								height: '100%',
							}}
						>
							<Sidebar />
							<Layout>
								<Content
									style={{
										background: '#fff',
										padding: 24,
										margin: 0,
									}}
								>
									{children}
								</Content>
							</Layout>
						</div>
						<Layout>
							<Sider
								width={200}
								style={{ background: '#fff', height: '100%' }}
							/>
						</Layout>
					</div>
				)
			}}
		/>
	)
}

export default RootLayout
