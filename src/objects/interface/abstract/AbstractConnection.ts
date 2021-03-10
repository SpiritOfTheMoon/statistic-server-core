import { HasNextPage, HasPreviousPage } from "../../../functions";
import { ConnectionArgs } from "../../args";
import { PageInfo } from "../../types";
import { AbstractEdge } from "./AbstractEdge";

export abstract class AbstractConnection<T> {

    public edges: AbstractEdge<T>[];

    public totalCount: number;

    public pageInfo: PageInfo;

    constructor(
        edges: AbstractEdge<T>[],
        totalCount: number,
        args: ConnectionArgs,
    ) {

        this.edges = edges;
        this.totalCount = totalCount;
        const pageInfo = this.getPageInfo(args);
        this.pageInfo = pageInfo;

    }

    private getPageInfo(
        args: ConnectionArgs,
    ): PageInfo {

        let startCursor: string | null;
        let endCursor: string | null;
        if (this.edges.length === 0) {

            startCursor = null;
            endCursor = null;

        } else {

            startCursor = this.edges[0].cursor;
            endCursor = this.edges[this.edges.length - 1].cursor;

        }
        return {
            startCursor,
            hasNextPage: HasNextPage(this.totalCount, args),
            hasPreviousPage: HasPreviousPage(this.totalCount, args),
            endCursor,
        };

    }
}