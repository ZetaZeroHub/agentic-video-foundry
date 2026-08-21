# Deployment media

Tracked files in this directory are public, lightweight website assets.

`agentic-video-foundry-demo.mp4` is deliberately ignored by Git. The current deployment copy comes from `delivery-v6/package/agentic-video-foundry-pop-v6-mixed.mp4`: H.264/AAC, 1080×1920, 30 fps, 255.067 seconds, SHA-256 `61ccb5645f00c68ca36f616d8d20a1620fb9d877ef653e2d1d024787ae366648`. Copy the approved public master to that exact path before packaging or deploying the site. Do not commit paid, private, or user media.

`og-cover.png` and `apple-touch-icon.png` are generated from the tracked SVG artwork and may be regenerated when the identity changes.

## Mascot frames

`assets/mascot/` contains five approved stop-motion actions from the V6 launch-video project: `intro`, `diagnosis`, `documents`, `audio`, and `qc`. Each action has three 418×418 transparent PNG source frames and three optimized WebP delivery frames. The website uses WebP first and PNG as a fallback; it does not synthesize or redraw the character at runtime.

The public filenames intentionally omit project-local scene numbers so page sections can use stable semantic names. Unused V6 action groups are not included in the website bundle. WebP frames use quality 78 with alpha quality 95; every optimized frame is under 30KB.
