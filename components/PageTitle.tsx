function PageTitle({ title }: { title: string }) {
  return <h1 className="capitalize font-bold text-3xl mt-4 mb-8 max-md:text-2xl">{title}</h1>;
}

export default PageTitle;
