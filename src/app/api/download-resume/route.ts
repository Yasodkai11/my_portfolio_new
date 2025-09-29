import { NextRequest, NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import { join } from 'path';

export async function GET(request: NextRequest) {
    try {
        const filePath = join(process.cwd(), 'public', 'Yasod Kavindu.pdf');
        const fileBuffer = await readFile(filePath);

        return new NextResponse(fileBuffer, {
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': 'attachment; filename="Yasod_Kavindu_Resume.pdf"',
                'Content-Length': fileBuffer.length.toString(),
            },
        });
    } catch (error) {
        console.error('Error serving PDF:', error);
        return new NextResponse('PDF not found', { status: 404 });
    }
}
