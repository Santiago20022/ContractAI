interface ShareData {
  title: string;
  partyA: string;
  partyB: string;
  type: string;
  content: string;
}

export async function encodeShareToken(data: ShareData): Promise<string> {
  const json = JSON.stringify(data);
  // Try gzip compression (modern browsers)
  try {
    const bytes = new TextEncoder().encode(json);
    const cs = new CompressionStream("gzip");
    const writer = cs.writable.getWriter();
    writer.write(bytes);
    writer.close();
    const compressed = await new Response(cs.readable).arrayBuffer();
    const arr = new Uint8Array(compressed);
    let binary = "";
    for (let i = 0; i < arr.length; i++) binary += String.fromCharCode(arr[i]);
    return "z" + btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
  } catch {
    // Fallback: plain base64
    const encoded = encodeURIComponent(json);
    return "r" + btoa(encoded).replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
  }
}

export async function decodeShareToken(token: string): Promise<ShareData | null> {
  try {
    const prefix = token[0];
    const b64 = token.slice(1).replace(/-/g, "+").replace(/_/g, "/");
    const padding = (4 - (b64.length % 4)) % 4;
    const padded = b64 + "=".repeat(padding);
    const binary = atob(padded);

    if (prefix === "z") {
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
      const ds = new DecompressionStream("gzip");
      const writer = ds.writable.getWriter();
      writer.write(bytes);
      writer.close();
      const decompressed = await new Response(ds.readable).arrayBuffer();
      return JSON.parse(new TextDecoder().decode(decompressed));
    } else {
      return JSON.parse(decodeURIComponent(binary));
    }
  } catch {
    return null;
  }
}
