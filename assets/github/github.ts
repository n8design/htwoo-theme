const GitHubBaseUrl = "https://api.github.com/repos/";
const RepoOwner = "n8design";
const Repo = "htwoo";
const header = {
    headers: { 
        "Authorization": "Bearer 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",
        "X-GitHub-Api-Version": "2022-11-28" 
    }
};

export class GitHub {

    constructor() {

    }

    private getAPIUrl = (apiEndpoint: string): string => {
        const baseUrl = `${GitHubBaseUrl}${RepoOwner}/${Repo}`;
        return `${baseUrl}/${apiEndpoint}`;
    }

    public testRepo = async () => {

        const queryUrl = `${GitHubBaseUrl}${RepoOwner}/${Repo}`;
        console.debug(queryUrl);

        const response = await fetch(queryUrl);
        const jsonData = await response.json();
        console.debug(jsonData);
    }

    public starGazer = async (): HTMLElement => {

        const response = await fetch(this.getAPIUrl('stargazers?per_page=100', header));
        const jsonData = await response.json();

        let curElement = document.createElement('div');
        curElement.classList.add('stargazers');

        curElement.innerHTML = `<h3>Community</h3>`;

        for (let user in jsonData) {
            curElement.innerHTML += `<span class="stargazer"><a href="${jsonData[user].html_url}" target="_blank">
            <img src="${jsonData[user].avatar_url}" alt="${jsonData[user].login}">
            </a><br>`;
        }
        return curElement;

    }

    public contributors = async () => {

        const response = await fetch(this.getAPIUrl('contributors?$expand=login', header));
        const jsonData = await response.json();
        console.debug("Contributors", jsonData);

    }

}