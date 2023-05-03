import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { Context } from '../Context';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Username: any;
};

export type Image = {
  __typename?: 'Image';
  height: Scalars['Int'];
  url: Scalars['String'];
  width: Scalars['Int'];
};

export type Location = {
  __typename?: 'Location';
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
};

export type Memory = {
  __typename?: 'Memory';
  id: Scalars['ID'];
  isLate: Scalars['Boolean'];
  location?: Maybe<Location>;
  memoryDay: Scalars['String'];
  primary: Image;
  secondary: Image;
  thumbnail: Image;
};

export type Post = {
  __typename?: 'Post';
  caption?: Maybe<Scalars['String']>;
  creationDate: Scalars['String'];
  id: Scalars['ID'];
  location?: Maybe<Location>;
  primary: Image;
  secondary: Image;
  takenAt: Scalars['String'];
  updatedAt: Scalars['String'];
  user?: Maybe<User>;
  userId: Scalars['ID'];
};

export type Query = {
  __typename?: 'Query';
  memories: Array<Maybe<Memory>>;
  posts: Array<Maybe<Post>>;
  users: Array<Maybe<User>>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  posts?: Maybe<Array<Maybe<Post>>>;
  profilePicture?: Maybe<Image>;
  username: Scalars['String'];
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Image: ResolverTypeWrapper<Image>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Location: ResolverTypeWrapper<Location>;
  Memory: ResolverTypeWrapper<Memory>;
  Post: ResolverTypeWrapper<Post>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']>;
  User: ResolverTypeWrapper<User>;
  Username: ResolverTypeWrapper<Scalars['Username']>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Boolean: Scalars['Boolean'];
  Float: Scalars['Float'];
  ID: Scalars['ID'];
  Image: Image;
  Int: Scalars['Int'];
  Location: Location;
  Memory: Memory;
  Post: Post;
  Query: {};
  String: Scalars['String'];
  User: User;
  Username: Scalars['Username'];
}>;

export type ImageResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Image'] = ResolversParentTypes['Image']> = ResolversObject<{
  height?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  width?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type LocationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Location'] = ResolversParentTypes['Location']> = ResolversObject<{
  latitude?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  longitude?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MemoryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Memory'] = ResolversParentTypes['Memory']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  isLate?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  location?: Resolver<Maybe<ResolversTypes['Location']>, ParentType, ContextType>;
  memoryDay?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  primary?: Resolver<ResolversTypes['Image'], ParentType, ContextType>;
  secondary?: Resolver<ResolversTypes['Image'], ParentType, ContextType>;
  thumbnail?: Resolver<ResolversTypes['Image'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PostResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Post'] = ResolversParentTypes['Post']> = ResolversObject<{
  caption?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  creationDate?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  location?: Resolver<Maybe<ResolversTypes['Location']>, ParentType, ContextType>;
  primary?: Resolver<ResolversTypes['Image'], ParentType, ContextType>;
  secondary?: Resolver<ResolversTypes['Image'], ParentType, ContextType>;
  takenAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  memories?: Resolver<Array<Maybe<ResolversTypes['Memory']>>, ParentType, ContextType>;
  posts?: Resolver<Array<Maybe<ResolversTypes['Post']>>, ParentType, ContextType>;
  users?: Resolver<Array<Maybe<ResolversTypes['User']>>, ParentType, ContextType>;
}>;

export type UserResolvers<ContextType = Context, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  posts?: Resolver<Maybe<Array<Maybe<ResolversTypes['Post']>>>, ParentType, ContextType>;
  profilePicture?: Resolver<Maybe<ResolversTypes['Image']>, ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface UsernameScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Username'], any> {
  name: 'Username';
}

export type Resolvers<ContextType = Context> = ResolversObject<{
  Image?: ImageResolvers<ContextType>;
  Location?: LocationResolvers<ContextType>;
  Memory?: MemoryResolvers<ContextType>;
  Post?: PostResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  Username?: GraphQLScalarType;
}>;

