'use client';

import { useState, useRef } from 'react';
import { Button } from '../ui/button';
import { Copy, CopyCheck } from 'lucide-react';

function CopyableText({ text }) {
    const [copied, setCopied] = useState(false);
    const spanRef = useRef(null);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy: ', err);
            setCopied(false);
        }
    };

    return (
        <div className="flex items-center">
            <span
                ref={spanRef}
                className=" flex flex-row items-center justify-items-stretch border border-gray-300 rounded px-1 py-1 w-full focus:outline-none focus:ring-2 focus:ring-green-300" // Tailwind styling
            >
                {text}
                <Button
                    onClick={handleCopy}
                    className="bg-green-300 hover:bg-green-400 text-white font-bold py-1 px-1 rounded-sm ml-1 focus:outline-none focus:ring-2 focus:ring-green-300" // Tailwind styling
                >
                    <Copy />
                </Button>
            </span>
        </div>
    );
}

export default CopyableText;