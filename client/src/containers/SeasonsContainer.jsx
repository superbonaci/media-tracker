import React from 'react';
import { connect } from 'react-redux';
import { clearSelectedSeason, selectSeason, updateTodoSeason } from '../actions';

import Seasons from '../components/MediaDetails/Seasons';
import SeasonEpisodesContainer from './SeasonEpisodesContainer';


class SeasonsContainer extends React.Component {
  componentWillUnmount() {
    this.props.clearSelectedSeason();
  }

  onDropdownChange = (event, { value }) => this.props.selectSeason(value);

  // IMPORTANT: season 0 ("Specials") is a valid value, so we must not use `||`
  // because `0 || something` will always fall back to `something`.
  getActiveSeason = () => {
    const { selectedSeason, newestActiveSeason } = this.props;

    return (selectedSeason !== null && selectedSeason !== undefined)
      ? selectedSeason
      : newestActiveSeason;
  };

  getDropdownOptions = (seasons, numberOfSeasons) => {
    // Prefer TMDb seasons array if available (it includes season_number 0 when Specials exist)
    if (Array.isArray(seasons) && seasons.length > 0) {
      return seasons
        .filter((s) => Number.isFinite(s.season_number))
        .sort((a, b) => a.season_number - b.season_number)
        .map((s) => ({
          key: s.season_number,
          value: s.season_number,
          text: s.name || (s.season_number === 0 ? 'Specials' : `Season ${s.season_number}`),
        }));
    }

    // Fallback: generate options from 1..numberOfSeasons
    const dropdownOptions = [];
    for (let i = 1; i <= numberOfSeasons; i++) {
      dropdownOptions.push({
        key: i,
        text: `Season ${i}`,
        value: i,
      });
    }
    return dropdownOptions;
  };

  getSeasonDoneStatus = () => {
    const {
      episodes,
      selectedTodo,
    } = this.props;

    const activeSeason = this.getActiveSeason();

    // If episodes aren't loaded yet (or season has no episodes), don't show as done
    if (!episodes || episodes.length === 0) return false;

    // Init season episodes status
    let doneEpisodes = [];
    if (
      selectedTodo
      && selectedTodo.seasons
      && selectedTodo.seasons[activeSeason]
    ) {
      doneEpisodes = selectedTodo.seasons[activeSeason].done_episodes;
    }

    return (doneEpisodes.length === episodes.length);
  };

  toggleSeasonStatus = () => {
    const { episodes, mediaId } = this.props;

    const activeSeason = this.getActiveSeason();
    const doneEpisodes = [];
    const seasonDoneStatus = this.getSeasonDoneStatus();

    // Add all episodes to done
    if (!seasonDoneStatus) {
      for (const ep of episodes) doneEpisodes.push(ep.episode_number);
    }

    const addSeasonData = {
      [activeSeason]: { done_episodes: doneEpisodes },
    };

    this.props.updateTodoSeason(mediaId, 'tv', addSeasonData);
  };

  render() {
    const {
      mediaId,
      numberOfSeasons,
      seasons,
    } = this.props;

    const activeSeason = this.getActiveSeason();

    return (
      <React.Fragment>
        <Seasons
          buttonOnClick={this.toggleSeasonStatus}
          dropdownOnChange={this.onDropdownChange}
          dropdownOptions={this.getDropdownOptions(seasons, numberOfSeasons)}
          seasonDoneStatus={this.getSeasonDoneStatus()}
          selectedSeason={activeSeason}
        />
        <SeasonEpisodesContainer
          mediaId={mediaId}
          selectedSeason={activeSeason}
        />
      </React.Fragment>
    );
  }
}


const mapStateToProps = (state) => ({
  episodes: state.mediaEpisodes,
  seasons: state.mediaDetails && state.mediaDetails.seasons,
  selectedSeason: state.ui.activeSeason,
  selectedTodo: state.selectedTodo,
});

export default connect(
  mapStateToProps,
  { clearSelectedSeason, selectSeason, updateTodoSeason },
)(SeasonsContainer);
