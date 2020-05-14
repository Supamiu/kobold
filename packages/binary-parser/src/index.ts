export class Parser {
	static fromBuffer<T extends typeof Parser>(this: T, buffer: Buffer) {
		return new this({
			data: new DataView(buffer.buffer, buffer.byteOffset, buffer.byteLength),
		}) as InstanceType<T>
	}

	private data: DataView
	private offset = 0

	constructor(opts: {data: DataView}) {
		this.data = opts.data
	}

	private fieldOffset(length: number) {
		const currentOffset = this.offset
		this.offset += length
		return currentOffset
	}

	protected uint8(): number {
		return this.data.getUint8(this.fieldOffset(1))
	}
}
